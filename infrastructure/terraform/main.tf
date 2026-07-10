# AQUOR platform — cloud skeleton (AWS af-south-1 primary).
# This provisions the state Phase 2 services need: network, database, cache,
# object storage and a container registry. The frontend can deploy to Vercel
# or to the EKS cluster defined here.

terraform {
  required_version = ">= 1.7"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  # backend "s3" { bucket = "aquor-tfstate"; key = "platform.tfstate"; region = "af-south-1" }
}

provider "aws" {
  region = var.region
}

variable "region" {
  type    = string
  default = "af-south-1"
}

variable "environment" {
  type    = string
  default = "staging"
}

locals {
  name = "aquor-${var.environment}"
  tags = {
    Project     = "aquor-platform"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

module "vpc" {
  source             = "terraform-aws-modules/vpc/aws"
  version            = "~> 5.0"
  name               = local.name
  cidr               = "10.20.0.0/16"
  azs                = ["${var.region}a", "${var.region}b", "${var.region}c"]
  private_subnets    = ["10.20.1.0/24", "10.20.2.0/24", "10.20.3.0/24"]
  public_subnets     = ["10.20.101.0/24", "10.20.102.0/24", "10.20.103.0/24"]
  enable_nat_gateway = true
  single_nat_gateway = var.environment != "production"
  tags               = local.tags
}

resource "aws_db_instance" "postgres" {
  identifier              = "${local.name}-pg"
  engine                  = "postgres"
  engine_version          = "16"
  instance_class          = var.environment == "production" ? "db.r6g.xlarge" : "db.t4g.medium"
  allocated_storage       = 100
  storage_encrypted       = true
  db_name                 = "aquor"
  username                = "aquor"
  manage_master_user_password = true
  multi_az                = var.environment == "production"
  backup_retention_period = 35
  deletion_protection     = var.environment == "production"
  db_subnet_group_name    = aws_db_subnet_group.postgres.name
  vpc_security_group_ids  = [aws_security_group.db.id]
  tags                    = local.tags
}

resource "aws_db_subnet_group" "postgres" {
  name       = "${local.name}-pg"
  subnet_ids = module.vpc.private_subnets
  tags       = local.tags
}

resource "aws_security_group" "db" {
  name   = "${local.name}-db"
  vpc_id = module.vpc.vpc_id
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [module.vpc.vpc_cidr_block]
  }
  tags = local.tags
}

resource "aws_elasticache_replication_group" "redis" {
  replication_group_id = "${local.name}-redis"
  description          = "AQUOR cache & queues"
  engine               = "redis"
  node_type            = var.environment == "production" ? "cache.r6g.large" : "cache.t4g.small"
  num_cache_clusters   = var.environment == "production" ? 2 : 1
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  tags                 = local.tags
}

resource "aws_elasticache_subnet_group" "redis" {
  name       = "${local.name}-redis"
  subnet_ids = module.vpc.private_subnets
}

resource "aws_s3_bucket" "assets" {
  bucket = "${local.name}-assets"
  tags   = local.tags
}

resource "aws_s3_bucket_public_access_block" "assets" {
  bucket                  = aws_s3_bucket.assets.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_ecr_repository" "web" {
  name                 = "aquor-web"
  image_tag_mutability = "IMMUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
  tags = local.tags
}

output "db_endpoint" {
  value = aws_db_instance.postgres.address
}

output "redis_endpoint" {
  value = aws_elasticache_replication_group.redis.primary_endpoint_address
}

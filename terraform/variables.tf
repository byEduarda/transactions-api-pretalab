variable "project_id" {
  type = string
}

variable "service_name" {
  type = string
}

variable "region" {
  type = string
}

variable "image" {
  type = string
}

variable "mongo_uri" {
  type = string
}

variable "container_port" {
  type = number
  default = 3000
}

variable "credentials_file" {
  type = string
}

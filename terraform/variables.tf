variable "credentials_file" {
  description = "Caminho do arquivo JSON de credenciais do GCP"
  type        = string
}

variable "project_id" {
  description = "ID do projeto GCP"
  type        = string
}

variable "region" {
  description = "Região do Cloud Run"
  type        = string
}

variable "service_name" {
  description = "Nome do serviço Cloud Run"
  type        = string
}

variable "image" {
  description = "Imagem do container no Container Registry"
  type        = string
}

variable "container_port" {
  description = "Porta do container"
  type        = number
}

variable "mongo_uri" {
  description = "URI do MongoDB"
  type        = string
}

variable "gemini_api_key" {
  description = "Nome do secret da GEMINI_API_KEY no Secret Manager"
  type        = string
}

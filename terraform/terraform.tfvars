credentials_file       = "./gcp-key.json"
project_id             = "pretalab-transactions"
region                 = "us-central1"
service_name           = "transactions-api"
image                  = "gcr.io/pretalab-transactions/transactions-api-pretalab:latest"
container_port         = 3000
mongo_uri              = "mongodb://usuario:senha@cluster0.pczfx9e.mongodb.net/pretalab-transactions"
gemini_api_key = "GEMINI_API_KEY"

# Define required providers and versions
terraform {
  required_providers {
    render = {
      source  = "renderinc/render"  # Using Render's free tier
      version = "0.1.0"             # Specify provider version for stability
    }
  }
}

# Configure the Render provider with authentication
provider "render" {
  api_key = var.render_api_key  # Store API key as a variable
}
# Define required providers and versions
terraform {
  required_providers {
    render = {
      source = "render-oss/render"
      version = "1.7.1"
    }
  }
}

# Configure the Render provider with authentication
provider "render" {
  api_key = var.render_api_key  # Store API key as a variable
}
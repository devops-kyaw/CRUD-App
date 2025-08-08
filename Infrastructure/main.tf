# Define a web service on Render's free tier
resource "render_web_service" "web_app" {
  name   = "ci-demo-app"
  plan   = "starter"
  region = "oregon"

  runtime_source = {
    docker_runtime = {
      auto_deploy = true
      branch      = "main"
      repo_url    = "https://github.com/kyawzawaungdevops/CRUD-App.git"
      # If your Dockerfile isn’t in repo root, add the correct path field accordingly.
    }
  }
}

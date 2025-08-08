resource "render_web_service" "web_app" {
  name   = "ci-demo-app"
  plan   = "starter"     # or "free", "standard", "pro", etc.
  region = "singapore"   # valid: oregon, ohio, virginia, frankfurt, singapore

  runtime_source = {
    docker = {
      auto_deploy = true
      branch      = "main"
      repo_url    = "https://github.com/kyawzawaungdevops/CRUD-App.git"
      # dockerfile_path = "Dockerfile"   # uncomment if your Dockerfile isn't at repo root
      # root_dir       = "app"           # for monorepos
    }
  }
}


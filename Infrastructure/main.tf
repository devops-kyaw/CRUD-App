# Define a web service on Render's free tier
resource "render_service" "web_app" {
  name = "ci-demo-app"                                 # Service name
  type = "web_service"                                 # Type of service
  repo = "https://github.com/kyawzawaungdevops/CRUD-App.git"  # Source repo
  env = "docker"                                       # Use Docker environment
  plan = "starter"                                     # Free tier plan
  branch = "main"                                      # Deploy from main branch
  build_command = "docker build -t app ."              # Build command
  start_command = "docker run -p 3000:3000 app"        # Start command
  auto_deploy = true                                   # Auto-deploy on commits
}
# Provide a simple gemspec so you can easily use your
# project in your rails apps through git.
Gem::Specification.new do |s|
  s.name        = "gerbil-rails"
  s.summary     = "Testing for Rails' Asset Pipeline using Gerbil"
  s.description = "Full support for the Rails 3.1 asset pipeline when testing your coffeescript or javascript files using Gerbil"
  s.files       = `git ls-files`.split "\n"
  s.homepage    = "http://github.com/foca/gerbil-rails"
  s.authors     = ["Nicolas Sanguinetti"]
  s.email       = "hi@nicolassanguinetti.info"
  s.version     = "0.0.1"
  s.platform    = Gem::Platform::RUBY
  s.add_dependency("rails")
end

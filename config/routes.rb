Rails.application.routes.draw do
  match "/gerbil" => "gerbil/spec#index"
end

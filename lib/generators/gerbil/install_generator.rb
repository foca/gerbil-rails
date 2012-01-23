require "rails/generators"

module Gerbil
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path("../templates", __FILE__)

      desc <<DESC
Description:
    Copy the gerbil/rails files to your application.
DESC

      def copy_spec_files
        directory "spec"
      end
    end
  end
end

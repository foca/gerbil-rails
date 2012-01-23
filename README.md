Gerbil::Rails
=============

This Rails 3.1 engine will make it trivial for you to test your javascript files
taking advantage of Rails 3.1's asset pipeline, and using the awesome
[Gerbil](http://github.com/elcuervo/gerbil).

Installation
------------

Include this gem in your `Gemfile`:

``` ruby
group :development, :test do
  gem "gerbil-rails"
end
```

Bundle it up, and run the included generator to set up the test structure:

    $ bundle
    $ script/rails generate gerbil:install

This will create a `spec/javascripts` directory, which includes a
`spec/javascripts/spec.js` file. Now you can add specs in subdirectories of
`spec/javascripts`.

Once that is done, start your server and head to http://localhost:3000/gerbil to
see your specs running before you.

About
-----

Brought to you by [Nicolás Sanguinetti](http://github.com/foca), thanks to the
support of [Cubox](http://cuboxlabs.com).

Thanks to [Jasminerice](http://github.com/bradphelan/jasminerice) for the
inspiration :)

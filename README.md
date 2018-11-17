# Personal Art Website
This is the code and configuration involved in the website rachaelnewsome.com. It is a suitable website template for artists, if you wish to use it for yourself refer to the "Adapting This For Your Website" section.

This website is implemented with react and build with `create-react-app`. In order to show photo-albums well across devices (namely showing 1 column on phone screens and 3 columns on laptop screens), this project uses the bootstrap library and the reactstrap wrapper.

# Adapting This For Your Website

## Building the website

The code is implemented in react and build with `create-react-app`. When you have installed node and the `create-react-app` package, you can execute `npm run build` to do a production build. The webserver configuration below has a DocumentRoot set to the build directory which `create-react-app` will use, namely the `build` subdirectory.

## Webserver Configuration
The file `apache_site.conf` is a starting point for using apache to serve this website. With recent versions of apache, that file is not just a snippet but exists at /etc/apache2/sites-enabled/000-default.conf and is processed upon startup. There are a few substitutions you will have to make from the hard-coded decisions. It has hard-coded file paths to the `mod_ssl` location, file paths to the SSL cert and private key, ServerName, and DocumentRoot. You will presumably want to set up your paths differently.

The usage of the apache rewrite engine here allows the react-router client-side routing to use the same set of URLs as what you can type into your browser. The apache server will just take whatever URL you type and pass it along to index.html and let react-router do its work.

## React Settings
The package.json file has a "homepage" field which you should set to the IP address or hostname you wish to use. This is hard-coded for rachaelnewsome.com, and you'll want it hard-coded to whatever you need.

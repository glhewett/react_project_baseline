CSS Project Baseline
====================

Goals
-----

As much fun as I have setting up projects, I know that I need to get some work done, so I have create this project as a baseline for any page that I need to create that would just include HTML and CSS.  I am fanatical about best practices whether I am coding or deploying.  This is my attempt to voice my opinion in what best practices should be.  I hope this will help web developers at all levels to improve the sites they are building by making them faster and easy to work on.

Technically, here are some of my goals.

1. Use high level CSS, like less.
2. Always deploy a site that loads a fast as possible
3. Don't overcomplicate "dev-mode" and "build-mode"
4. Provide a template for custom fonts (PT Sans and Font Awesome)
5. Framework independent (CSS and JS)


Getting Started
---------------

This project is being built so that it can be the first commit of any new site.  Clone the project and start building a new creation.  If you would like to allow updates from upstream as they are made, you can do a few things to make that easier.

### Installing

The first step in creating a new site would be to clone the project baseline, but you must make sure that you change the name of the directory to something meaningful.  For example, if I wanted to create a new site for myself, I would use the following commands.

```
# clone the css_project_baseline but name it something different
git clone git@github.com:glhewett/css_project_baseline.git greghewett.com
```

Now change your current working directory to the newly checked out project.

```
cd greghewett.com
```

If you want to be able to pull in updates to the baseline project, then I would rename the origin remote to upstream.  The current origin remote will be the remote you just checked out.  I anticipate that you will create a new remote for your new project in the place of the current origin.  I have created a new remote, and this is how I configured it.

```
# rename the origin remote to upstream
git remote rename origin upstream

# add your new get repository as origin
git remote add origin git@github.com:glhewett/greghewett.com.git

# push the baseline project to your new project to make sure it works.
git push
```

Now that you have your git configuration completed, you need to install the node dependencies.  All of the dependencies are listed in the `package.json` if you want to take a look.  If you don't care, then install gulp to your global node_modules, which will add the gulp command to your path.  All of the other dependencies will be installed locally, in this current working directory.

```
# install gulp to global modules
npm install -g gulp

# install npm dependencies
npm install
```

When building a new page or application, you will want to use `index.html` instead of `sample.html`, so copy that file over.  Also you will want to have an `app.css` instead of a `sample.css`, so we need to copy that file over, too.

```
# copy the sample file
cp app/less/sample.less app/less/app.less
cp public/sample-css-page.html public/index.html
```

Finally, you will want to change the `index.html` to load the `app.css` file instead of the `sample.css` file.  You can easily do that with you editor, or you can be tricky and use sed.

```
# load app.css instead of sample.css
sed -i '' 's/sample.css/app.css/' public/index.html
```

### Usage

To start up server for development (using BrowserSync):

```
gulp
```

To build the application for deployment issue the following command and copy the contents of the build directory to your web server.

```
gulp build
```

### Allowing for upstream updates

Gulpfile.js
-----------

TBD

Layout
------

Minimal changing and moving of files

Build & Deploy
--------------

Deploy not included.

Secure
------

If you would like to add SSL to your site, you can get started with [Let's Encrypt](https://letsencrypt.org/getting-started/).


Future
------

In the future, I would like to for this project in order to add the following baselines:

* Generic Javascript with unit tests  (Framework independent)
* React + Redux with unit tests

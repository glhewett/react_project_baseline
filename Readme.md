CSS Project Baseline
====================

Goals
-----

Getting Started
---------------

```
# clone the css_project_baseline but name it something different
git clone git@github.com:glhewett/css_project_baseline.git greghewett.com
cd greghewett.com

# rename the origin remote to upstream
git remote rename origin upstream

# add your new get repository as origin
git remote add origin git@github.com:glhewett/greghewett.com.git
git push

# install gulp
npm install -g gulp

# install npm dependencies
npm install

# copy the sample file
cp app/less/sample.less app/less/app.less
cp public/sample-css-page.html public/index.html

sed -i '' 's/sample.css/app.css/' public/index.html
```

Gulp
----

Layout
------

Build & Deploy
--------------


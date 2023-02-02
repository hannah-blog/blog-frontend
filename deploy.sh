yarn build
yarn export
git add out/
git commit -m "어영부영 급하게 만들기..."
git subtree push --prefix out origin gh-pages
git checkout gh-pages

cd ..
rm -rf HongChaeMin.github.io/**
cp -rf blog-front/** HongChaeMin.github.io
cd HongChaeMin.github.io
git pull
git add --all
git commit -m "어영부영 급하게 만들기..."
git push
cd blog-front
git checkout feat/resume

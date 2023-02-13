# 작업 브랜치에 커밋이 완료 되어있어야함!
yarn build
yarn export
git add out/
git commit -m "feat(seo): site map 설정 파일 이름 수정, description 길이 수정"
git subtree push --prefix out origin gh-pages
git checkout gh-pages
git pull

cd ..
rm -rf HongChaeMin.github.io/**
cp -rf blog-front/** HongChaeMin.github.io
cd HongChaeMin.github.io
git pull
git add --all
git commit -m "feat(seo): site map 설정 파일 이름 수정, description 길이 수정"
git push
cd ../blog-front
git checkout feat/resume

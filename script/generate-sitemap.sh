
# 퍼블릭 폴더로 이동
cd public

# 기존에 있던 사이트맵 폴더를 제거하고 빈 디렉토리를 만듦
rm -rf sitemap
mkdir sitemap

# 스크립트 폴더로 이동해서 아래의 순서대로 실행
cd ..
cd script

# robots.txt 생성
bun ./robots.js

# 정적 sitemap 생성
echo "정적 sitemap 생성중.."
bun ./sitemap-common.js
echo "정적 sitemap 생성 완료!"

#동적 sitemap 생성
echo "동적 sitemap 조회 및 생성중.."
bun ./sitemap-posts.js
echo "동적 sitemap 생성 완료!"

# sitemap 압축 및 병합
echo "sitemap gzip 압축중"
bun ./sitemap-compress.js
echo "sitemap 압축 완료"

# 기본 sitemap 생성
bun ./sitemap.js
echo "기본 sitemap 생성 완료!"

# Google 서치콘솔에 sitemap 업데이트 핑 전송
# curl http://google.com/ping?sitemap=http://www.hannah-log.site/sitemap.xml
# echo "Google에 sitemap 핑 전송"

# 위의 핑 전송 api는 지원이 중단되었습니다.
# Sitemaps ping is deprecated. See https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping.<

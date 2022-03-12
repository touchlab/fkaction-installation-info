npm run packall
git add .
git commit -m "$2"
git tag -a -m "$2" "v$1"
git push --follow-tags
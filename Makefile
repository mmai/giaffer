publish:
	rsync -av www/ gh-pages/
	cd gh-pages; \
	  git add --ignore-errors *; \
	  git commit -am"update pages";\
	  git push

chrome:
	gulp --gulpfile gulpfile_chrome.js

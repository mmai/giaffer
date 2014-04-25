publish:
	cd gh-pages
	git add *
	git commit -am"update pages"
	git push

chrome:
	gulp --gulpfile gulpfile_chrome.js

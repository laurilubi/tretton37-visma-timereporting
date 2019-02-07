# tretton37-visma-timereporting
MITM proxy to get user-friendly Visma Time reporting experience

# start the proxy server
```
npm install
npm start
```

# proxy injects files
The proxy injects 2 javascript and 2 CSS files into every page.
- site-wide common javascript
- site-wide common CSS
- page-specific javascript
- page-specific CSS

If the page does not have jquery, it will be injected also.

The easiest way is to open F12 Developer Tools and check the network tab for the files could be created.

# to create your own version - you are welcome to go ahead and commit & push
- Copy folder customization/tretton37 to customization/_mytest_
- Modify it
- Set cookie _customization=_mytest_ in your browser
- Verify that the browser links to CSS and JS files under /customization/_mytest_

You can test it locally by running nodejs

# A/B testing and branching
The workflow is that you create your version in folder customization/_mytest_. As soon as you push, the code gets deployed. You can play around and evaluate it - use it for your time reports, show for some others to get feedback if it actually helps them. Then create a pull request and you can merge it into master (customizations/tretton37).

# deploy
Changes will be automatically deployed to http://time1337.azurewebsites.net

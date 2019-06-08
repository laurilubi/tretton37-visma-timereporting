# tretton37-visma-timereporting
Chrome extension to get user-friendly Visma Time reporting experience.

# install
`TODO` Non-developer version will be put it into Chrome Web Store.

# development
- git clone from `https://github.com/laurilubi/tretton37-visma-timereporting.git`
- Go to `chrome://extensions/` and check the box for Developer mode in the top right.
- Click `Load unpacked` in the left top corner
- Point out the folder where you cloned the code into

# function
## extension injects files
The extension injects 2 javascript and 2 CSS files into every page.
- site-wide common javascript
- site-wide common CSS
- page-specific javascript
- page-specific CSS

If the page does not have jquery, it will be injected also.

The easiest way is to open F12 Developer Tools and check the network tab for the files could be created.

## to create your own version - you are welcome to go ahead and commit & push
- Copy folder customization/tretton37 to customization/_mytest_
- Modify it
- Choose your customization under options `TODO` build options page
- Verify that the browser links to CSS and JS files under /customization/_mytest_

## A/B testing and branching
The workflow is that you create your version in folder customization/_mytest_. As soon as you push, it becomes available for other developers. You can play around and evaluate it - use it for your time reports, show for some others to get feedback if it actually helps them. Then create a pull request and you can merge it into master (customizations/tretton37).

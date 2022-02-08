# Description
A simple web application for browsing music albums.

This application will get data from `http://www.subsonic.org/pages/api.jsp`

- Use the Subsonic API to query for the 10 most recently added albums.
- Display the album covers for the loaded albums in a horizontal scrolling gallery.


![](https://i.snipboard.io/fQ519h.jpg)

# Run project
```bash
# Install all dependencies
$ npm i

# Start dev server
$ npm run dev
```
# Improvements:
- What changes would you need to make to allow the user to “star” their favorite tracks?
  - I would create a favicon on each track and after the user clicks on that `favorite button` it'll save on localstorage or into the database via API (post).
- How could the interface be made more responsive when a large number of albums must be loaded?
  - I would add a pagination or infinite load.
- How could you make the album list scroll vertically along the left side if the window is narrow?
  - I would add a `@media` query on `.scss` to handle this, when the window is narrow, I could show a diferent UI, with a vertically left bar (using flexbox).
  Or using any UI framework would be way easy to handle this scenario.
- What other ideas do you have for improvements or features that could be added to the product?
  - I would add the `Play button` to play those tracks, `Favorite track or album` to save in the section and the way of these album covers are displayed, I'd change to aways see albuns, because right now, when the user selects the first album, there is a big gap (whitespace) on the left side, then I'd change it to something like a carousel (loop of covers).

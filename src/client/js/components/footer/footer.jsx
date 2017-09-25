import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './footer.scss';

const Footer = (props) => {
  return (
    <footer className={`${s.footer} ${props.isLoading ? s.isLoading : ''} ${props.searchOpen ? s.searchOpen : ''}`}>
      <div className={s.section}>
        <h1>
          A free, open source project to help web developers
        </h1>
        <p>
          v1.2.0 | Created by <a href="https://twitter.com/AlexJRsaunders" target="_blank" rel="noopener noreferrer">@alexjrsaunders</a>
        </p>
        <p>
          Released under the
          <a href="https://github.com/alex-saunders/ecmasyntax.io/blob/master/LICENSE.txt" target="_blank" rel="noopener noreferrer">
            &nbsp;MIT license.
          </a>
        </p>
      </div>
      <div className={s.section}>
        <h1>Share</h1>
        <p>
          <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//ecmasyntax.io" target="_blank" rel="noopener noreferrer" className={s.facebook}>
            <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE1NS4xMzkgMTU1LjEzOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTU1LjEzOSAxNTUuMTM5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPHBhdGggaWQ9ImZfMV8iIGQ9Ik04OS41ODQsMTU1LjEzOVY4NC4zNzhoMjMuNzQybDMuNTYyLTI3LjU4NUg4OS41ODRWMzkuMTg0ICAgYzAtNy45ODQsMi4yMDgtMTMuNDI1LDEzLjY3LTEzLjQyNWwxNC41OTUtMC4wMDZWMS4wOEMxMTUuMzI1LDAuNzUyLDEwNi42NjEsMCw5Ni41NzcsMEM3NS41MiwwLDYxLjEwNCwxMi44NTMsNjEuMTA0LDM2LjQ1MiAgIHYyMC4zNDFIMzcuMjl2MjcuNTg1aDIzLjgxNHY3MC43NjFIODkuNTg0eiIgZmlsbD0iIzAwNkRGMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
          </a>
          <a href="https://twitter.com/home?status=Javascript%20syntax%20reference%3A%20https%3A//ecmasyntax.io" className={s.twitter}>
            <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTEuNTM3IDUxMS41MzciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMS41MzcgNTExLjUzNzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIHN0eWxlPSJmaWxsOiM2NUJCRjI7IiBkPSJNMzU3LjAzOCw0OS4xNzJjLTU5LjI4NCwwLjg5OC0xMDUuOTkzLDUyLjA5OC0xMDUuOTkzLDExMS4zODJ2MTQuMzcyICBDMTQ1LjA1MiwxNTYuMDYzLDkyLjk1NCwxMjcuMzE5LDM1LjQ2Niw2Ny4xMzdjLTM0LjEzMyw2Ni40NywzLjU5MywxMjIuMTYxLDQ0LjkxMiwxNTIuNzAyYy0yNy44NDYsMC01MS4yLTMuNTkzLTY5LjE2NS0xOS43NjEgIGMtMS43OTYtMC44OTgtMy41OTMsMC0yLjY5NSwxLjc5N2MxNS4yNyw1NS42OTEsNjcuMzY4LDk2LjExMiwxMDcuNzg5LDEwNy43ODljLTM2LjgyOCwwLTYxLjA4MSw1LjM4OS04Ny4xMy0xMC43NzkgIGMtMS43OTYtMC44OTgtMy41OTMsMC0yLjY5NSwxLjc5NmMxOS43NjEsNTQuNzkzLDU5LjI4NCw3MS44NiwxMTYuNzcyLDcxLjg2Yy0yOC43NDQsMjEuNTU4LTY3LjM2OCw0My4xMTYtMTQwLjEyNiw0NC45MTIgIGMtMi42OTUsMC00LjQ5MSwzLjU5My0xLjc5Niw1LjM4OWMyNi45NDcsMjIuNDU2LDkzLjQxOCwzOS41MjMsMTg2LjgzNSwzOS41MjNjMTUzLjYsMCwyNzguNDU2LTEzNi41MzMsMjc4LjQ1Ni0zMDUuNDA0di04Ljk4MiAgYzI0LjI1My04Ljk4MiwzNy43MjYtMzAuNTQsNDQuOTEyLTUyLjA5OGMwLTAuODk4LTAuODk4LTEuNzk2LTEuNzk3LTEuNzk2bC01MS4yLDE3Ljk2NWMtMC44OTgsMC0xLjc5Ni0xLjc5Ni0wLjg5OC0yLjY5NSAgQzQ3OS4yLDkyLjI4OCw0OTUuMzY4LDcwLjczLDUwMi41NTQsNTAuMDdjMCwwLTAuODk4LTAuODk4LTEuNzk3LTAuODk4Yy0yNC4yNTMsOS44ODEtNDcuNjA3LDE5Ljc2MS02NS41NzIsMjUuMTUxICBjLTIuNjk1LDAuODk4LTYuMjg4LDAuODk4LTguOTgyLTAuODk4QzQxNC41MjYsNjcuMTM3LDM3OS40OTQsNDkuMTcyLDM1Ny4wMzgsNDkuMTcyIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
          </a>
        </p>
        <iframe src="https://ghbtns.com/github-btn.html?user=alex-saunders&repo=ecmasyntax.io&type=star&count=true" frameBorder="0" scrolling="0" width="160px" height="30px" />
      </div>
    </footer>
  )
}

export default withStyles(s)(Footer);

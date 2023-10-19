<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<h3 align="center">Insert Cool Title Here for react Chrome Extension</h3>

  <p align="center">
    A simple chrome extension that provides a small, localized toolkit aimed at assisting react streamers with a better quality of life. 
    <br />
    <a href="https://github.com/bkcrowder/react-chat-extesion"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/bkcrowder/react-chat-extesion">View Demo</a>
    ·
    <a href="https://github.com/bkcrowder/react-chat-extesion/issues">Report Bug</a>
    ·
    <a href="https://github.com/bkcrowder/react-chat-extesion/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites for Contributing</a></li>
        <li><a href="#installation">Installing to Contribute</a></li>
        <li><a href="#consumption">Installing to Use</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a pet project I started up to help the streamers out a little bit. The goals of this (at the moment) are to:
- Make users joining / leaving more visible
- Provide a cumulative at-a-glance tip total, viewer count, and MAYBE uptime?
- Give streamers an interface to see unacknowledged and acknowledged tips (for those times where you miss tips in chat and have incentives tied to dollar amounts)
- MAYBE at in @ support for highlighting when one user @s another user with the extension

As I said, this is a pet project of mine. That means that I work at my own pace. I'm happy to take feedback, constructive criticism, and whatever else! Just know that not every suggested feature, fix, or change will make it into this. I honestly don't care if it's shared, forked, contributed to, or whatever else.

Please note that, because this is an extension, data contained within it is isolated from other extensions. There are no API calls being made at this moment, since I want as much as possible to remain under the control of the streamer / user. That also means that there will be differences in synchronization between user experiences (e.g. hosting streamer may see full tip amount and user contributions, while someone joining later who also has the extension only sees data that populates while said person is in chat).

Again, I want to end-user to remain in control of that data.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![React][React.js]][React-url]
<br/>
[![Bootstrap][Bootstrap.com]][Bootstrap-url]
<br/>
[![TScript][Typescript]][Typescript-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

You're going to need NPM.
* npm
  ```sh
  npm install npm@latest -g
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation
These are instructions for installing the extension ONLY if you intend to contribute to the code.

1. Clone the repo
   ```sh
   git clone https://github.com/bkcrowder/react-chat-extesion.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ``````

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Consumption

TODO: Write up simplified install instructions and package releases for easy download.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

<!-- ROADMAP -->
## Roadmap

### Core features
- [x] MutationObserver events
  - [x] User Join
  - [x] User Leave
  - [x] Tip Received
- [x] Tip trigger events
  - [x] Tip Completed
  - [x] Tip Undo
- [x] Persist data to localstorage on browser
  - [x] Utilize Redux-Persist
  - [x] Ensure data stays localized to user only
  - [x] Provide mechanism to clear isolated local data
- [ ] Core communication between extension popup and content script
    - [ ] Bilateral communication between extension and content script (model payloads and add observable events)
    - [ ] Events mapped and marked with ownership to avoid collisions in messaging via shared handler
- [x] Population of users from roll call
    - [x] Populate number of users in channel
- [x] Tip capturing
    - [x] Read new tips
    - [x] Display Incomplete Tips
    - [x] Process Completing Tips
    - [x] Display Completed Tips
    - [x] Process undo Completed Tips (re-renders as an incomplete tip with amount)
- [x] Simulate tip functionality for UX and behavior testing
- [x] Channel lockdown based on streamer name and current user. Do not load embed when you are not the streamer.

### Bonus Features
- [x] Abstract user context from hierarchical injection to provide it "app-wide"
- [ ] Stacked toasts on actions
  - [ ] Tip Received
- [x] @user highlighting in chat
- [ ] Customizable colors for embed (and maybe the site?)
  - [ ] Create own "theme" using the popup. Popup sends theme configuration to embed.
  - [ ] Add redux-persist key storage for theme
  - [ ] Update theme context to apply consistent theme throughout embed
- [ ] Binding activity definitions for incentives and appending those to tips? (Example: $20 for taking a shot. User donates $20. You go over to user's donation acknowledgement and select "Take a shot"). This might be useful for analytics of most popular go-to incentives, or just for funsies. Could also be too tedious. Idk.
- [x] Goals
   - [x] Ability to set goals and target amounts
   - [x] Track tips towards goal(s) based on the set target for the goal
   - [x] Add goals
   - [x] Remove goals
   - [x] Redux-Persist goals
   - [x] Goal Countdown
- [ ] Splinter functionality so that things like @user highlights work when not streamer? or separate into its own extension? Unminifying doesn't pose a threat here (results in 64k lines of still obscured code).
- [ ] Customize theme and polish UX
- [ ] Port to Firefox / Safari / Opera? (lolololol... maybe...)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/bkcrowder/react-chat-extesion](https://github.com/bkcrowder/react-chat-extesion)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Me, because I'm awesome](https://github.com/bkcrowder)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/bkcrowder/react-chat-extesion.svg?style=for-the-badge
[contributors-url]: https://github.com/bkcrowder/react-chat-extesion/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/bkcrowder/react-chat-extesion.svg?style=for-the-badge
[forks-url]: https://github.com/bkcrowder/react-chat-extesion/network/members
[stars-shield]: https://img.shields.io/github/stars/bkcrowder/react-chat-extesion.svg?style=for-the-badge
[stars-url]: https://github.com/bkcrowder/react-chat-extesion/stargazers
[issues-shield]: https://img.shields.io/github/issues/bkcrowder/react-chat-extesion.svg?style=for-the-badge
[issues-url]: https://github.com/bkcrowder/react-chat-extesion/issues
[license-shield]: https://img.shields.io/github/license/bkcrowder/react-chat-extesion.svg?style=for-the-badge
[license-url]: https://github.com/bkcrowder/react-chat-extesion/blob/master/LICENSE.txt
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Typescript]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square
[Typescript-url]: https://www.typescriptlang.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
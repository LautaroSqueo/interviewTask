# Functional UI Testing with Playwright

This project contains a set of functional user interface tests using [Playwright](https://playwright.dev/). The tests are designed to verify the search functionality and the addition of tracks in a web application.

## Description

The tests include the following cases:

1. **Search Functionality**: Verifies that UI elements are displayed correctly when searching for tracks.
2. **Add Track Using "+"**: Checks that a single track can be added to the playlist.
3. **Add Multiple Tracks**: Verifies that multiple tracks can be effectively added to the playlist.

## Requirements
    ```
    - Node.js (version 12 or higher)
    - Playwright
    ```

## Installation

1. Clone this repository:
   ```bash
   git clone <repository URL>
   cd <repository name>
   ```

2. Install Dependencies: Ensure you have Node.js installed. Then, run:
    ```
    npm install
    ```

3. Install the necessary browsers:
    ```
    npx playwright install
    ```

## Usage
1. To run the tests, use the following command:
    ```
    npx playwright test
    ```



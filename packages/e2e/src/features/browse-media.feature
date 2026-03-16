@e2e
Feature: Browse media content

  As a visitor I can browse movies and TV shows,
  view their details, and navigate through their photos.

  Background:
    Given I open the application
    Then the home page is visible

  @home
  Scenario: Carousels are displayed on the home page
    Then I see at least one carousel of posters
    And each carousel has a visible title

  @navigation
  Scenario: Navigating from home to a detail page via a poster
    When I click on the first poster in a carousel
    Then I am on a detail page
    And the media remote is loaded

  @detail
  Scenario: Detail page shows movie information
    When I click on the first poster in a carousel
    Then I am on a detail page
    And the title is visible
    And the synopsis is visible
    And the rating is visible

  @photos
  Scenario: Opening the photo carousel from the detail page
    When I click on the first poster in a carousel
    And I am on a detail page
    And I click on a photo in the photos section
    Then the photo viewer is open

  @photos
  Scenario: Navigating to the next photo in the carousel
    When I click on the first poster in a carousel
    And I am on a detail page
    And I click on a photo in the photos section
    And the photo viewer is open
    When I go to the next photo
    Then a different photo is displayed

  @photos
  Scenario: Closing the photo viewer returns to the detail page
    When I click on the first poster in a carousel
    And I am on a detail page
    And I click on a photo in the photos section
    And the photo viewer is open
    When I close the photo viewer
    Then I am on a detail page

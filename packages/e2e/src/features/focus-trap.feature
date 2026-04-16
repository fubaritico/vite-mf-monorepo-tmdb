@a11y
Feature: Focus trap in photo modal

  As a keyboard user I expect Tab to cycle only within
  the photo viewer dialog and never escape to the page behind.

  Background:
    Given I open the application
    Then the home page is visible

  @photos
  Scenario: Tab cycles within the photo viewer dialog
    When I click on the first poster in a carousel
    And I am on a detail page
    And I click on a photo in the photos section
    Then the photo viewer is open
    When I cycle Tab through the photo viewer
    Then focus never leaves the dialog

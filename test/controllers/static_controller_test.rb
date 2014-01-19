require 'test_helper'

class StaticControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get puzzles" do
    get :puzzles
    assert_response :success
  end

  test "should get containers" do
    get :containers
    assert_response :success
  end

end

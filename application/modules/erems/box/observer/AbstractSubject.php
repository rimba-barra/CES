<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AbstractSubject
 *
 * @author TOMMY-MIS
 */
abstract class Erems_Box_Observer_AbstractSubject implements Erems_Box_Observer_InterfaceSubject{
    protected $observers = array();
    
    function __construct() {
        
    }
    
    function attach(Erems_Box_Observer_InterfaceObserver $observer_in) {
      //could also use array_push($this->observers, $observer_in);
      $this->observers[] = $observer_in;
    }
    
    function detach(Erems_Box_Observer_InterfaceObserver $observer_in) {
      //$key = array_search($observer_in, $this->observers);
      foreach($this->observers as $okey => $oval) {
        if ($oval == $observer_in) { 
          unset($this->observers[$okey]);
        }
      }
    }
    
    function notify() {
      foreach($this->observers as $obs) {
        $obs->update($this);
      }
    }
    
    
    
}

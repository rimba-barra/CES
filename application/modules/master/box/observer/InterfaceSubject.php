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
interface Master_Box_Observer_InterfaceSubject {
    function attach(Master_Box_Observer_InterfaceObserver $observer_in);
    function detach(Master_Box_Observer_InterfaceObserver $observer_in);
    function notify();
}

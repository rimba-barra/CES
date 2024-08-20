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
interface Erems_Box_Observer_InterfaceSubject {
    function attach(Erems_Box_Observer_InterfaceObserver $observer_in);
    function detach(Erems_Box_Observer_InterfaceObserver $observer_in);
    function notify();
}

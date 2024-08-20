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
interface Cashier_Box_Observer_InterfaceSubject {
    function attach(Cashier_Box_Observer_InterfaceObserver $observer_in);
    function detach(Cashier_Box_Observer_InterfaceObserver $observer_in);
    function notify();
}

<?php

class Cashier_Box_Models_App_Box extends Cashier_Box_Kouti_AbbApp{
    public function init() {
        $this->session = new Cashier_Box_Models_App_Session();
    }
}
?>

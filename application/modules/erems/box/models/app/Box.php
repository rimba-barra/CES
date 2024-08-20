<?php

class Erems_Box_Models_App_Box extends Erems_Box_Kouti_AbbApp{
    public function init() {
        $this->session = new Erems_Box_Models_App_Session();
    }
}
?>

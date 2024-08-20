<?php

class Box_Models_App_Box extends Box_Kouti_AbbApp{
    public function init() {
        $this->session = new Box_Models_App_Session();
    }
}
?>

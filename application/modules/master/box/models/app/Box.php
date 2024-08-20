<?php

class Master_Box_Models_App_Box extends Master_Box_Kouti_AbbApp{
    public function init() {
        $this->session = new Master_Box_Models_App_Session();
    }
}
?>

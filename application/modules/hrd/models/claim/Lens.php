<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Lens
 *
 * @author MIS
 */
class Hrd_Models_Claim_Lens extends Hrd_Models_Claim_ClaimGlasses {
    public function __construct() {
        parent::__construct();
        $this->setType("L");
    }


}

?>

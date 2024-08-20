<?php

/**
 * Description of Default
 *
 * @author David-MIS
 */
class Erems_Models_Suratperingatan_CitraWinagunManado {
	
    public function getListTagihanHTML($params){
        $schedule = $params["schedule"][0];
        $total = 0.0;
        $ttldenda_terlambatb=0;
        $ttlremaining_balance=0;
        $table = "";

        foreach($schedule as $row){
            if($row['indicatorname'] == 'denda'){
                $denda = $row["remaining_denda"];
            }else{
                $denda = $row["denda_terlambatb"];
            }
            $ttldenda_terlambatb=$ttldenda_terlambatb+$denda;
            $ttlremaining_balance=$ttlremaining_balance+$row["remaining_balance"];
            $table .='<tr>
                        <td>'.$row["scheduletype"].'</td>
                        <td>'.$row["termin"].'</td>
                        <td>'.date('d-m-Y',strtotime($row["duedate"])).'</td>
                        <td align=right>Rp. '.number_format($row["remaining_balance"]).'</td>
                        <!--<td>'.$row["hari_terlambatb"].'</td><td>'.$row["sp_no"].'</td>--> 
                        <td align=right>Rp. '.number_format($denda).'</td>
                        <td align=right>Rp. '.number_format($row["remaining_balance"]+$denda).'</td>
                    </tr>';
        }

        $table .='<tr><td>&nbsp</td><td>&nbsp</td><td>Total </td><td align=right>Rp. '.number_format($ttlremaining_balance).'</td>
                <!--<td></td><td></td>--> <td width="150px" align=right>Rp. '.number_format($ttldenda_terlambatb).'</td><td width="150px" align=right>Rp. '.number_format($ttlremaining_balance+$ttldenda_terlambatb).'</td></tr>';

        return $table;
    }
    
    public function getHTMLdefault(){
       return $this->getHTML();
    }

    public function getHTML($spke=null){

        $tpl1=
        '<style>
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:12px;
                }
                td{
                    padding:2px 10px;
                }
                body{
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
                <!--<p class="spstyle_p" align="right">Jakarta, <b>{{tanggal_print_w}}</b></p>-->
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
				<p class="spstyle_p">Jakarta, <b>{{tanggal_print_w}}</b><br/>
                <p class="spstyle_p">No. Ref : <b>{{nomor_sp_teratas}}</b><br/>
                    Hal : Pemberitahuan ke <b>{{max_sp}}</b></p>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p>

                <!--<br>-->

                <p class="spstyle_p">Dengan Hormat,<!--<br/>-->
                <div class="amiddle">';
            
            $tpl2 = 
                'Menindaklanjuti <b>Surat Pemberitahuan {{sp_ke_before}}</b> kami tanggal {{tgl_sp1}} No. {{sp_no_before}}. ';
				
			$tpl21 = 
                'Menindaklanjuti <b>Surat Pemberitahuan {{sp_ke_before}}</b> kami tanggal {{tgl_sp2}} No. {{sp_no_before}}. ';
				
			$tpl22 = 
                'Menindaklanjuti <b>Surat Pemberitahuan {{sp_ke_before}}</b> kami tanggal {{tgl_sp3}} No. {{sp_no_before}}. ';

            $tpl3 = 
                'Bersama ini kami beritahukan kepada Bapak/Ibu selaku pembeli rumah Blok <b> {{unit_number}} </b> <b>{{cluster}}</b>, bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>{{tanggal_print_w}}</b> belum melaksanakan pembayaran uang muka yang telah jatuh tempo, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah):
                </div>
                <br/>

                <table>
					<tbody>
						<tr style="background-color: #e8e9ea;font-weight: bold:height="60x";">
							<td>Tagihan</td>
							<td>Termin</td>
							<td width="150px">Tanggal Jatuh Tempo</td>
							<td width="150px">Nilai Tagihan</td>
							<!--<td>Keterlambatan (hari) </td><td>Nomor SP - Tanggal SP</td>-->
							<td width="150px">Denda Keterlambatan <br>( s/d {{max_date}} )*</td>
							<td width="150px">Total Dibayar <br>( s/d {{max_date}} )*</td>
						</tr> 
                {{{list_tagihan}}}
                </tbody></table>
                <br/>
                <div class="amiddle">
                Denda keterlambatan diatas akan berubah sampai dengan pembayaran dan dihitung sejak tgl. terhutang.
                Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:<br/>
                <table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">a.</td>
                        <td align="justify" style="border:none;">
                            Transfer ke : <b>CITRA FORTUNA JO a/c. 146.009.8977999 Bannk Mandiri Cabang Ngurah Rai Pontianak.</b> Mohon mencantumkan nomor kavling dan nama pemesan pada kolom berita dislip transfer (bukti transfer mohon <b>di fax ke (021) 6198213 Up. Henni/Eny</b> atau <b>WA ke 0813810704944.</b>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">b.</td>
                        <td align="justify" style="border:none;">
                            b.	Bukti Transfer/Pembayaran dapat ditukar kwitansi 2 Minggu dari tanggal transaksi ke kasir CitraGarden Aneka, Marketing Office, Ruko Aerowalk Blok A00 No.1-3 Jl.Arteri Supadio Km.17.5 Kab.Kubu Raya 78391 Up. <b>Santy</b> di no.Telp. <b>0561-8100099</b>
                        </td>

                    </tr>
                </table>
                <br/>
                Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> Untuk penyelesaian pembayaran diatas. Untuk tindak lanjut penyelesaian dapat menghubungi petugas collection kami, sdri. <b>Henny/Eny</b> di no. telp. <b>021-6198177 ext. 711/727.</b>
                 <br/><br/>

                 ';

            $tpl6 = ', kami tegaskan kepada Bapak/Ibu selaku pembeli rumah Blok <b>{{unit_number}}</b> kawasan {{cluster}}, bahwa pemesanan rumah tersebut menjadi batal.
                    <br/>
                    Keseluruhan uang yang telah Bapak/Ibu bayarkan  tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali rumah tersebut kepada pihak lain. 
                     
                    <br/>
                    Demikian hal ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.

                <br/><br/> ';    

            $tpl4 =  '
                Apabila lewat dari tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami mengganggap Bapak/Ibu membatalkan pemesanan rumah tersebut. Keseluruhan uang yang telah Bapak/Ibu bayarkan tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali rumah tersebut kepada pihak lain
                 <br/><br/>';

            $tpl5 .= 'Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu  kami ucapkan terima kasih.
                </div>
                <!--<br/><br/>-->
                <p class="spstyle_p">
                Hormat Kami,</br>
                <b>CITRA FORTUNA JO</b>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <b>RISDALELI</b><br/>
                Manager Keuangan
                </p>

                <p class="spstyle_p_small">*Note : Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</p>
                </body>
                ';
        if($spke==1){
            $tpl = $tpl1.$tpl3.$tpl5;
        }
        elseif($spke==2){
            $tpl = $tpl1.$tpl2.$tpl3.$tpl5;
        }
        elseif($spke==3){
            $tpl = $tpl1.$tpl21.$tpl3.$tpl4.$tpl5;
        }
        elseif($spke==4){
            $tpl = $tpl1.$tpl22.$tpl6.$tpl5;
        }else{
            $tpl = $tpl1.$tpl3.$tpl5;
        }
        
        return $tpl; 
    }
    
}

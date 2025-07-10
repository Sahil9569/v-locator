<template>
    <v-container class="maxWidth">
        <v-row class="justify-space-between contactSection">
            <v-col cols="12" md="6"  data-aos="fade-up" data-aos-duration="500">
                <img src="@/assets/images/locator/QR-code.png">
            </v-col>
            <v-col cols="12" md="6"  data-aos="fade-up" data-aos-duration="500">
                <div class="sb-contact-form-frame">
                    <div class="sb-illustration-9">
                        <div class="sb-cirkle-1"></div>
                        <div class="sb-cirkle-2"></div>
                        <div class="sb-cirkle-3"></div>
                    </div>
                    <div class="sb-form-content">
                        <div class="sb-main-content">
                            <h3 class="sb-mb-30">Send Message</h3>
                            <form id="form" method="post" action="https://starbelly.archielite.com/contact/send" class="contact-form">
                                <input type="hidden" name="_token" value="1Y8SnZkw3JIOKxifsp659QJQ8JHMqcln09JwEqXL">
                                <div class="sb-group-input"><input type="text" name="name" required=""><span class="sb-bar page_speed_1221726130"></span><label>Name</label></div>
                                <div class="sb-group-input"><input type="email" name="email" required=""><span class="sb-bar page_speed_1221726130"></span><label>Email</label></div>
                                <div class="sb-group-input"><textarea name="content" required=""></textarea><span class="sb-bar page_speed_1221726130"></span><label>Message</label></div>
                                <div class="contact-form-group">
                                <div class="contact-message contact-success-message page_speed_1950296321"></div>
                                <div class="contact-message contact-error-message page_speed_1950296321"></div>
                                </div>
                                <p class="sb-text sb-text-xs sb-mb-30">*We promise not to disclose your <br>personal information to third parties.</p>
                                <button class="sb-btn sb-cf-submit sb-show-success" type="submit" id="submit"><span class="sb-icon"><img src="https://starbelly.archielite.com/themes/starbelly/images/icons/arrow.svg" alt="Send"></span><span>Send</span></button>
                            </form>
                        </div>
                    </div>
                    </div>
                <!-- <div class="formStyleContact">
                    <v-label class="mb-2 font-weight-medium">First Name</v-label>
                    <v-text-field variant="outlined" color="primary"></v-text-field>
                </div> -->
            </v-col>
        </v-row>
    </v-container>
</template>
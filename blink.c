/* Blink Example

   This example code is in the Public Domain (or CC0 licensed, at your option.)

   Unless required by applicable law or agreed to in writing, this
   software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied.
*/
#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "sdkconfig.h"

/* Can use project configuration menu (idf.py menuconfig) to choose the GPIO to blink,
   or you can edit the following line and set a number here.
*/
#define BLINK_GPIO 25
#define BLINK_GPIO_SEL (1ULL << BLINK_GPIO)

void app_main(void)
{
    /* Configure the IOMUX register for pad BLINK_GPIO (some pads are
       muxed to GPIO on reset already, but some default to other
       functions and need to be switched to GPIO. Consult the
       Technical Reference for a list of pads and their default
       functions.)
    */

    gpio_config_t config = {};
    config.pin_bit_mask = BLINK_GPIO_SEL;
    gpio_config(&config);
  
    gpio_pad_select_gpio(BLINK_GPIO);
    /* Set the GPIO as a push/pull output */
    gpio_set_direction(BLINK_GPIO, GPIO_MODE_OUTPUT);
    int i = 0;
    while(1) {
	/* Blink on (output high) */
	gpio_set_level(BLINK_GPIO, 1);
	vTaskDelay(1000 / portTICK_PERIOD_MS);
	/* Blink off (output low) */
	printf("Hello world %d\n", i++); // Make sure you have \n
	gpio_set_level(BLINK_GPIO, 0);
	vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}

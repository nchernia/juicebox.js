/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016-2017 James Robinson
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/**
 * Barebones event bus.
 */

var hic = (function (hic) {


    hic.EventBus = function() {

        // Map eventType -> list of subscribers
        this.subscribers = {};
    }

    hic.EventBus.prototype.subscribe = function(eventType, object) {

        var subscriberList = this.subscribers[eventType];
        if(subscriberList == undefined) {
            subscriberList = [];
            this.subscribers[eventType] = subscriberList;
        }
        subscriberList.push(object);

    }

    hic.EventBus.prototype.post = function(event) {

        var eventType = event.type,
            subscriberList = this.subscribers[eventType];

        subscriberList.forEach(function (subscriber) {

            if("function" === typeof subscriber.receiveEvent) {
                subscriber.receiveEvent(event);
            }

        });

    }


    hic.LocusChangeEvent = function () {
        this.type = "LocusChange";
    }



    hic.GlobalEventBus = new hic.EventBus();



    return hic;

})
(hic || {});
import {Node} from "nodered";
import Timer from "timer";
import parseBMF from "commodetto/parseBMF";
import Poco from "commodetto/Poco";
import Resource from "Resource";

class DisplayText extends Node {
    onStart(config) {
        super.onStart(config);
    };
    onMessage(msg, done) {
        let render = new Poco(screen);
        let white = render.makeColor(255, 255, 255);
        let gray = render.makeColor(0, 0, 0);
        render.begin();
        render.fillRectangle(gray, 0, 0, render.width, render.height);
        render.end();

        let font = parseBMF(new Resource("Noto-Regular.bf4"));
        let textWidth = render.getTextWidth(msg.payload, font);
        let x = render.width;
        let y = (render.height - font.height) >> 1;
        let loop = false;  // set false to scroll text once across the screen

        Timer.repeat(id => {
            render.begin(0, y, render.width, font.height);
            render.fillRectangle(gray, 0, 0, render.width, render.height);
            render.drawText(msg.payload, font, white, x, y);
            if (!loop) {
                if (x + textWidth == 0)
                        Timer.clear(id);
            } else {
                if (x + textWidth < render.width)
                        ;
                        //render.drawText(text, font, white, x + textWidth, y);
            }
            if (x + textWidth == 0)
                x = render.width;
            else
                --x;
            render.end();
        }, 17);

        done();
    };
    static type = "mcu_displaytext";
    static {
         RED.nodes.registerType(this.type, this)
    };
};


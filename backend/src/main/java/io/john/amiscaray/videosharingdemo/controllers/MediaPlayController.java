package io.john.amiscaray.videosharingdemo.controllers;

import io.john.amiscaray.videosharingdemo.services.MediaStreamLoader;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@AllArgsConstructor
public class MediaPlayController {

    private MediaStreamLoader mediaLoaderService;

    @GetMapping(value = "/play/media/v02/")
    @ResponseBody
    public ResponseEntity<StreamingResponseBody> playMediaV02(
//            @PathVariable("vid_id")
//            String video_id,
            @RequestHeader(value = "Range", required = false)
            String rangeHeader)
    {

        try
        {
            String filePathString = "D:\\tutorial-courses\\video-streaming-demo\\backend\\src\\main\\resources\\videos\\javatechie.mp4";
            //D:\tutorial-courses\video-streaming-demo\backend\src\main\resources\videos\javatechie.mp4
            //src/main/resources/videos/javatechie.mp4
            //backend/src/main/resources/videos/javatechie.mp4

            ResponseEntity<StreamingResponseBody> retVal =
                    mediaLoaderService.loadPartialMediaFile(filePathString, rangeHeader);

            return retVal;
        }
        catch (FileNotFoundException e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (IOException e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

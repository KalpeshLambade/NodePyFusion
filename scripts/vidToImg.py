from PIL import Image
import os
import sys
import cv2

#Convertor
def video_to_images(video_path, output_folder, target_fps):
    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # Open the video file
    video = cv2.VideoCapture(video_path)
    
    # Get the original frame rate of the video
    original_fps = video.get(cv2.CAP_PROP_FPS)
    frame_count = int(video.get(cv2.CAP_PROP_FRAME_COUNT))
    
    print(f"Original FPS: {original_fps}, Total Frames: {frame_count}")
    
    # Calculate the frame interval
    frame_interval = int(original_fps / target_fps)
    if frame_interval <= 0:
        frame_interval = 1
    
    current_frame = 0
    saved_frames = 0
    
    while video.isOpened():
        ret, frame = video.read()
        if not ret:
            break
        
        # Save frame based on interval
        if current_frame % frame_interval == 0:
            image_path = os.path.join(output_folder, f"frame_{saved_frames:05d}.jpg")
            cv2.imwrite(image_path, frame)
            saved_frames += 1
        
        current_frame += 1
    
    video.release()
    print(f"Saved {saved_frames} frames to {output_folder}")

#Main Function
def main():
    # Get the command line arguments passed by the JavaScript code
    arguments = sys.argv[1:]  # sys.argv[0] is the script name
    if len(arguments) < 2:
        print("Error: Not enough arguments provided")
        sys.exit(1)

    # Extract the arguments
    video_path = arguments[0]
    output_folder = arguments[1]
    target_fps = int(arguments[2])

    video_to_images(video_path, output_folder, target_fps)


if __name__ == "__main__":
    main()
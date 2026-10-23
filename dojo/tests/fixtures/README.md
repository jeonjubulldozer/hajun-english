tone.mp3 is a synthetic, quiet 220 Hz sine wave for MP3 decoding and playback tests. It contains no speech and cannot validate Korean narration quality.

Generate with:
```sh
ffmpeg -f lavfi -i "sine=frequency=220:duration=2:sample_rate=24000" -filter:a "volume=0.02" -ac 1 -b:a 24k tone.mp3
```

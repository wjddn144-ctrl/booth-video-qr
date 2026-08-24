import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const projectUrl = new URL('../', import.meta.url);

test('Given the booth page, when a visitor opens it, then the video is ready for mobile playback', async () => {
  const pageSource = await readFile(new URL('index.html', projectUrl), 'utf8');

  assert.match(pageSource, /<html lang="ko">/);
  assert.match(pageSource, /<video/);
  assert.match(pageSource, /controls/);
  assert.match(pageSource, /playsinline/);
  assert.match(pageSource, /media\/booth-intro\.mp4/);
  assert.match(pageSource, /부스의 이야기를 영상으로 만나보세요/);
});

test('Given a QR visitor, when the page loads, then it asks for no login or personal information', async () => {
  const pageSource = await readFile(new URL('index.html', projectUrl), 'utf8');

  assert.doesNotMatch(pageSource, /<form/);
  assert.doesNotMatch(pageSource, /<input/);
  assert.match(pageSource, /개인정보 입력 없이/);
});

test('Given the public page, when its link is shared, then social metadata uses the deployed URL', async () => {
  const pageSource = await readFile(new URL('index.html', projectUrl), 'utf8');

  assert.match(pageSource, /property="og:title" content="부스 소개 영상"/);
  assert.match(pageSource, /https:\/\/wjddn144-ctrl\.github\.io\/booth-video-qr\//);
  assert.match(pageSource, /media\/social-preview\.png/);
});

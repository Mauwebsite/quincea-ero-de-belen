import {test} from 'node:test';
import assert from 'node:assert/strict';
import {remaining, musicLink, safeHttps} from '../src/lib.ts';
test('contador interpreta la fecha de Lima como medianoche UTC', () => {
  assert.deepEqual(remaining('2026-11-28T19:00:00-05:00', Date.parse('2026-11-28T23:00:00Z')).values, [0,1,0,0]);
  assert.equal(remaining('2026-11-28T19:00:00-05:00', Date.parse('2026-11-29T00:00:01Z')).ended, true);
  assert.deepEqual(remaining('2026-11-28T19:00:00-05:00', Date.parse('2027-01-01')).values, [0,0,0,0]);
});
test('solo admite embeds musicales oficiales con identificador válido', () => {
  assert.equal(musicLink('https://youtu.be/dQw4w9WgXcQ?si=test')?.embed,'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  assert.equal(musicLink('https://open.spotify.com/intl-es/track/4uLU6hMCjMI75M1A2tKUQC?si=x')?.url,'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC');
  for (const url of ['javascript:alert(1)','http://youtu.be/dQw4w9WgXcQ','https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ','https://evil@youtube.com/watch?v=dQw4w9WgXcQ','https://youtube.com/watch?v=bad','https://example.com/audio.mp3']) assert.equal(musicLink(url),null);
});
test('el álbum requiere HTTPS y no acepta credenciales incrustadas', () => {
  assert.equal(safeHttps(''),''); assert.equal(safeHttps('javascript:alert(1)'),''); assert.equal(safeHttps('https://a:b@example.com'),''); assert.equal(safeHttps('https://example.com/album'),'https://example.com/album');
});


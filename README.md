# MyPiServer
A test webserver for my raspi.

## HTTPS (Caddy + Pi-hole on same host)

This Pi also runs Pi-hole, which typically binds to `:80` and `:443`. To avoid port conflicts, this project can serve the site via **Caddy on port `8081`**, while the router forwards **WAN `443` → Pi `8081`**.

### Router/NAT

- Forward **TCP 443** to `192.168.0.111:8081`
- (Optional) Forward **TCP 80** elsewhere (Pi-hole can keep `:80`); this setup does not require port 80 for HTTPS

### Caddy configuration

`/etc/caddy/Caddyfile`:

```caddy
{
  # Pi-hole already uses :80, so move Caddy's HTTP port away.
  http_port 8082

  # We're terminating HTTPS on :8081 (with WAN 443 forwarded here),
  # so don't try to bind :80 just to redirect.
  auto_https disable_redirects
}

https://nilscarlson.dev:8081 {
  root * /var/www/mypiserver
  file_server
}

https://www.nilscarlson.dev:8081 {
  redir https://nilscarlson.dev{uri} permanent
}
```

### Service commands

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl enable --now caddy
sudo systemctl restart caddy
sudo systemctl status caddy --no-pager
```

Caddy will automatically obtain and renew Let’s Encrypt certificates as long as `nilscarlson.dev` resolves to your public IP and port 443 reaches the Pi.

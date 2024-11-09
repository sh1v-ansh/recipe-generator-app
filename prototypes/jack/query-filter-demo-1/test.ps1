$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    conditions = @(
        @{
            field = "nutrition"
            op = "<="
            value = 500
            field_type = "calories"
        }
    )
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/recipes/search" `
                  -Method Post `
                  -Headers $headers `
                  -Body $body
